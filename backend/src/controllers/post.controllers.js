import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { GoogleGenAI } from "@google/genai";

export const createPost = async (req, res) => {
    const { caption, image, category } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized user' });
    }

    if (!caption || !caption.trim()) {
        return res.status(400).json({ success: false, message: 'Caption is required' });
    }

    if (!category) {
        return res.status(400).json({ success: false, message: 'Category is required' });
    }

    try {
        const post = await prisma.post.create({
            data: {
                caption,
                image,
                authorId: userId,
                category: category.toUpperCase()
            },
        });

        res.status(201).json({ success: true, post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create post' });
    }
};


export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
        }

        await prisma.like.deleteMany({
            where: { postId },
        });


        await prisma.comment.deleteMany({
            where: { postId },
        });


        await prisma.post.delete({
            where: { id: postId },
        });


        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete post' });
    }
};


export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }


        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });

            const likeCount = await prisma.like.count({
                where: { postId },
            });

            return res.status(200).json({
                success: true,
                message: 'Post unliked',
                isLiked: false,
                likeCount,
            });
        }

        const like = await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });

        const likeCount = await prisma.like.count({
            where: { postId },
        });

        return res.status(200).json({
            success: true,
            message: 'Post liked',
            isLiked: true,
            likeCount,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to toggle like' });
    }
};


export const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    if (!content || !content.trim()) {
        return res.status(400).json({ success: false, message: 'Comment content is required' });
    }

    try {

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId,
            },
        });

        res.status(201).json({ success: true, comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to comment on post' });
    }
};


export const getLikeCountByPostId = async (req, res) => {
    const { postId } = req.params;


    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        const likeCount = await prisma.like.count({
            where: { postId },
        });

        res.status(200).json({ success: true, postId, likeCount });
    } catch (error) {
        console.error('Error getting like count:', error);
        res.status(500).json({ success: false, message: 'Failed to get like count' });
    }
};
export const getCommentCountByPostId = async (req, res) => {
    const { postId } = req.params;


    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        const commentCount = await prisma.comment.count({
            where: { postId },
        });

        res.status(200).json({ success: true, postId, commentCount });
    } catch (error) {
        console.error('Error getting comment count:', error);
        res.status(500).json({ success: false, message: 'Failed to get comment count' });
    }
};


export const isLikedByCurrentUser = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId || !userId) {
        return res.status(400).json({ success: false, message: 'Post ID and user must be provided' });
    }

    try {
        const like = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        const isLiked = !!like;

        return res.status(200).json({
            success: true,
            isLiked,
        });
    } catch (error) {
        console.error('Error checking like status:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    }
                }
            }
        });

        res.status(200).json({ success: true, postId, comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch comments' });
    }
};



export const getPostById = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ success: false, message: 'Post ID is required' });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const { category } = req.query;

        const normalizedCategory = category?.toUpperCase();

        const filter = category && category !== 'All'
            ? { category: normalizedCategory }
            : {};

        const posts = await prisma.post.findMany({
            where: filter,
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json({ success: true, posts });
    } catch (err) {
        console.error("Error fetching posts:", err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch posts' });
    }
};



export const generateAiCaption = async (req, res) => {
    const ai_prompt = req.body.aiPrompt;

    const API_KEY = process.env.GEMINI_API_KEY;

    const ai = new GoogleGenAI({ API_KEY });

    try {
        const prompt = `
        You are a creative social media assistant. Based on the following user input, generate a short, catchy, and engaging post caption. Keep it informal and relatable. Use emojis where appropriate. Limit it to 1–2 sentences.
        User input: "${ai_prompt}"`;

        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });

        return res.status(200).json({ success: true, aiCaption: response.text || 'No response from AI' });

    } catch (error) {
        console.error('Error fetching all posts:', error);
        res.status(500).json({ success: false, message: 'Failed to generate caption from AI' });
    }

}

export const generateAiPostCategory = async (req, res) => {
    const caption = req.body.caption;

    const API_KEY = process.env.GEMINI_API_KEY;

    const ai = new GoogleGenAI({ API_KEY });


    const categories = [
        'All',
        'Technology',
        'Music',
        'Gaming',
        'Sports',
        'News',
        'Entertainment',
        'Education',
        'Travel',
        'Food',
        'Fashion',
        'Science',
        'Art',
        'Health',
        'Business',
        'Comedy',
        'Movies',
        'Books',
        'Photography',
        'Fitness'
    ];

    try {
        const prompt = `
        You are an AI trained to categorize social media post captions.
        Based on the caption provided, choose the most relevant category from this list:

        ${categories.join(', ')}

        Caption: "${caption}"

        Respond with only one category from the list. Do not include any explanation or extra text.
        `;

        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });

        const raw = response.text.trim();


        const matchedCategory = categories.find(
            (cat) => cat.toLowerCase() === raw.toLowerCase()
        );


        if (!matchedCategory) {
            return res.status(200).json({
                success: true,
                category: 'TECHNOLOGY',
                message: 'AI did not match any category. Defaulting to "All".',
            });
        }

        return res.status(200).json({ success: true, category: matchedCategory });

    } catch (error) {
        console.error('Error fetching all posts:', error);
        res.status(500).json({ success: false, message: 'Failed to generate category from AI' });
    }

}