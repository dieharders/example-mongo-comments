// Comment schema
export class Comment {
    _id: string;
    name: string;
    comment: string;
    timestamp: number;
    elapsed: string = 'less than a month ago'; // a label stored only on client to determine elapsed time since post
    avatar: string;
    likes: number;
}