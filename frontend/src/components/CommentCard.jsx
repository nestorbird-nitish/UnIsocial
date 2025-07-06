import React from 'react';
import { User } from 'lucide-react';
import { formatDate } from '../utils/getDate';

export const CommentCard = ({ comment }) => {
    const {
        content,
        createdAt,
        user = {}
    } = comment || {};

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={18} className="text-gray-500" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">
                            {user?.username || 'Unknown User'}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};
