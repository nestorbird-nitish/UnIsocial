
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
    const { caption, image } = req.body;
    const userId = req.userId;

    console.log(userId);
    

    try {
        const post = await prisma.post.create({
            data: {
                caption,
                image,
                authorId: userId,
            },
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({success: false, message: 'Failed to create post' });
    }
};

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (!post || post.authorId !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
        }

        await prisma.post.delete({ where: { id: postId } });
        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete post' });
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const like = await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });

        res.status(200).json({ message: 'Post liked', like });
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(400).json({ success: false, message:'Already liked this post' });
        }
        res.status(500).json({ success: false, message: 'Failed to like post' });
    }
};

export const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId,
            },
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to comment on post' });
    }
};
