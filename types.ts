export interface Virtue {
    id: 'compassion' | 'creativity' | 'courage' | 'curiosity';
    name: string;
    description: string;
    icon: string;
}

export interface Calling {
    id: string;
    name: string;
    virtue: Virtue['id'];
    imageUrl: string;
    activity: string;
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: {
        text: string;
        image: string;
        virtue: Virtue['id'];
    }[];
}

export type ImageStyle = 'artistic' | 'photorealistic' | 'comic';

export interface GeneratedCallingDetails {
    story: string;
    roleModel: {
        name: string;
        bio: string;
    };
    skillPath: {
        title: string;
        description: string;
    };
    firstStep: {
        title: string;
        description: string;
    };
}

export interface TimeCapsuleEntry extends GeneratedCallingDetails {
    id: number;
    name: string;
    virtue: Virtue;
    calling: Calling;
    imageUrl: string;
    date: string;
}