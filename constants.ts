import type { Virtue, Calling, QuizQuestion } from './types';

export const VIRTUES: Record< Virtue['id'], Virtue> = {
    compassion: {
        id: 'compassion',
        name: 'Compassion',
        description: "This is the spark of 'The Healer,' 'The Guide,' and 'The Protector.' It's the drive to care for others and make the world a kinder place.",
        icon: '💖'
    },
    creativity: {
        id: 'creativity',
        name: 'Creativity',
        description: "This is the spark of 'The Maker,' 'The Artist,' and 'The Storyteller.' It's the drive to imagine new things and bring beauty into the world.",
        icon: '🎨'
    },
    courage: {
        id: 'courage',
        name: 'Courage',
        description: "This is the spark of 'The Adventurer,' 'The Leader,' and 'The Defender.' It's the drive to face challenges and stand up for what's right.",
        icon: '🦁'
    },
    curiosity: {
        id: 'curiosity',
        name: 'Curiosity',
        description: "This is the spark of 'The Explorer,' 'The Scientist,' and 'The Thinker.' It's the drive to ask questions, learn, and understand the world.",
        icon: '🌍'
    },
};

export const CALLINGS: Record<string, Calling> = {
    // Compassion
    healer: { id: 'healer', name: 'The Healer (Doctor)', virtue: 'compassion', imageUrl: 'https://picsum.photos/seed/doctor/600', activity: "Find your favorite toy and let's give them a 'check-up' together to make sure they feel loved." },
    guide: { id: 'guide', name: 'The Guide (Teacher)', virtue: 'compassion', imageUrl: 'https://picsum.photos/seed/teacher/600', activity: "Let's teach one of your toys something new, like how to count to three or the name of a color." },
    farmer: { id: 'farmer', name: 'The Farmer', virtue: 'compassion', imageUrl: 'https://picsum.photos/seed/farmer/600', activity: "Let's plant a seed in a small pot and promise to take care of it every day." },
    wildlifeBiologist: { id: 'wildlifeBiologist', name: 'The Wildlife Biologist', virtue: 'compassion', imageUrl: 'https://picsum.photos/seed/wildlife/600', activity: "Let's watch the birds outside and see if we can learn what they are doing." },
    
    // Creativity
    artist: { id: 'artist', name: 'The Artist', virtue: 'creativity', imageUrl: 'https://picsum.photos/seed/artist/600', activity: "Let's find some paper and crayons and draw the most colorful, wonderful creature you can imagine." },
    musician: { id: 'musician', name: 'The Musician', virtue: 'creativity', imageUrl: 'https://picsum.photos/seed/musician/600', activity: "Let's make our own instruments with pots and spoons and create a family band." },
    artisan: { id: 'artisan', name: 'The Artisan (Craftsperson)', virtue: 'creativity', imageUrl: 'https://picsum.photos/seed/artisan/600', activity: "Let's build something amazing out of clay or building blocks." },
    dancer: { id: 'dancer', name: 'The Dancer', virtue: 'creativity', imageUrl: 'https://picsum.photos/seed/dancer/600', activity: "Let's put on your favorite song and invent a brand new dance together." },

    // Courage
    protector: { id: 'protector', name: 'The Protector (Defense)', virtue: 'courage', imageUrl: 'https://picsum.photos/seed/protector/600', activity: "Let's build a strong, safe fort out of pillows and blankets for all your toy friends." },
    astronaut: { id: 'astronaut', name: 'The Astronaut', virtue: 'courage', imageUrl: 'https://picsum.photos/seed/astronaut/600', activity: "Let's pretend to walk on the moon, taking big, slow, bouncy steps around the room." },
    sportsStar: { id: 'sportsStar', name: 'The Sports Star', virtue: 'courage', imageUrl: 'https://picsum.photos/seed/sports/600', activity: "Let's practice throwing and catching a soft ball, cheering for every try." },
    forestRanger: { id: 'forestRanger', name: 'The Forest Ranger', virtue: 'courage', imageUrl: 'https://picsum.photos/seed/forestry/600', activity: "Let's go on a nature walk and be the guardians of the park, making sure it's clean and safe for animals." },
    
    // Curiosity
    explorer: { id: 'explorer', name: 'The Explorer (Archaeologist)', virtue: 'curiosity', imageUrl: 'https://picsum.photos/seed/archaeology/600', activity: "Let's go on a 'backyard safari' and find three different kinds of leaves or interesting rocks." },
    scientist: { id: 'scientist', name: 'The Scientist', virtue: 'curiosity', imageUrl: 'https://picsum.photos/seed/scientist/600', activity: "Let's do a sink-or-float experiment! Find small toys and guess if they will sink or float in water."},
    roboticsEngineer: { id: 'roboticsEngineer', name: 'The Robotics Engineer', virtue: 'curiosity', imageUrl: 'https://picsum.photos/seed/robotics/600', activity: "Let's design and draw our own robot. What special jobs can it do?"},
    climateScientist: { id: 'climateScientist', name: 'The Climate Scientist', virtue: 'curiosity', imageUrl: 'https://picsum.photos/seed/climate/600', activity: "Let's learn about recycling and sort things into paper, plastic, and trash." },

    // Future Callings (Mixed Virtues)
    aiEthicist: { id: 'aiEthicist', name: 'The AI Ethicist', virtue: 'compassion', imageUrl: 'https://picsum.photos/seed/ai/600', activity: "Let's talk about being kind and fair, and how we can teach our 'robot' friends to be the same." },
    spaceMiner: { id: 'spaceMiner', name: 'The Space Miner', virtue: 'courage', imageUrl: 'https://picsum.photos/seed/spacemining/600', activity: "Let's hunt for special 'space rocks' (interesting pebbles) in the garden or park." },
    greenEnergyEngineer: { id: 'greenEnergyEngineer', name: 'The Green Energy Engineer', virtue: 'creativity', imageUrl: 'https://picsum.photos/seed/greenenergy/600', activity: "Let's make a pinwheel and watch how the wind can create amazing power." },
    biotechnologist: { id: 'biotechnologist', name: 'The Biotechnologist', virtue: 'curiosity', imageUrl: 'https://picsum.photos/seed/biotech/600', activity: "Let's look at a flower up close and talk about all its different, amazing parts." },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        text: 'Would you rather...',
        options: [
            { text: 'Help a lost puppy find its way home?', virtue: 'compassion', image: 'https://picsum.photos/seed/puppy/400' },
            { text: 'Build the tallest, most amazing tower?', virtue: 'creativity', image: 'https://picsum.photos/seed/tower/400' },
        ],
    },
    {
        id: 2,
        text: 'Would you rather...',
        options: [
            { text: 'Explore a mysterious, hidden cave?', virtue: 'courage', image: 'https://picsum.photos/seed/cave/400' },
            { text: 'Discover what makes a rainbow appear?', virtue: 'curiosity', image: 'https://picsum.photos/seed/rainbow/400' },
        ],
    },
    {
        id: 3,
        text: 'Would you rather...',
        options: [
            { text: 'Paint a beautiful mural for everyone to see?', virtue: 'creativity', image: 'https://picsum.photos/seed/mural/400' },
            { text: 'Make sure everyone gets a turn on the swings?', virtue: 'compassion', image: 'https://picsum.photos/seed/swings/400' },
        ],
    },
    {
        id: 4,
        text: 'Would you rather...',
        options: [
            { text: 'Learn how to speak to animals?', virtue: 'curiosity', image: 'https://picsum.photos/seed/animals/400' },
            { text: 'Lead your friends on a grand adventure?', virtue: 'courage', image: 'https://picsum.photos/seed/adventure/400' },
        ],
    }
];