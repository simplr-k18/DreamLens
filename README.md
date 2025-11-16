# DreamLens: The Art of Seeing the Spark

This document is not just a technical README. It is a set of first principles for an application designed to serve a profound purpose: to help parents and children see the invisible, to bring clarity to a child's innate potential, and to align a family around a shared journey of discovery.

DreamLens is an act of creation, born from empathy for the parent's hope and the child's boundless imagination. Its quality is measured not by its features, but by the depth of conversation it inspires. It avoids the noise of fleeting trends, striving instead for a state of simple, profound connection. It is honest about the challenge of parenting, yet confident in the power of a child's inner spark.

Think of this application not as a destination, but as a map. It is the result of a focused effort to understand the truth of a child's unique calling. By mastering the principles within—harmony in design, purpose in user flow, and truth in its generated stories—we create more than an app. We create a tool for nurturing potential, built with intention, wisdom, and unwavering focus on the future.

---

## The DreamLens Product Guide: Complete Architecture & Strategy

### Part 1: Visual Design & Typography

The visual identity of DreamLens is crafted to feel warm, magical, and trustworthy—like a classic storybook brought to life.

#### Font Selection

-   **Headings (`font-serif`):** **Lora**. A serif font that evokes a sense of timeless wisdom and storytelling. It gives weight and importance to key moments, like the reveal of a virtue.
-   **Body Text (`font-sans`):** **Nunito Sans**. A clean, rounded sans-serif that is highly readable, friendly, and modern. It ensures that all descriptions and stories are accessible and easy for both parents and children to read.

*Why this combination? It balances the classic with the modern, creating an experience that feels both profound and delightfully simple.*

#### Typography Hierarchy & Sizing

-   **Title (e.g., "DreamLens", "See the spark"):** 5xl-6xl, Bold/Extra-bold, `text-warm-gold` or `text-forest-green`.
-   **Section Headings (e.g., "Let's create the dream..."):** 3xl-4xl, Serif, Bold, `text-forest-green`.
-   **Body Text:** lg, Sans-serif, Regular, `text-stone` or `text-forest-green`.
-   **Buttons & UI Elements:** Sans-serif, Bold, various colors.
-   **Line spacing:** Standard Tailwind classes are used to ensure breathable, readable text blocks.

#### Color Palette (The Magic of Nature)

The color palette is inspired by a serene, magical forest at dusk.

-   **Primary:** `forest-green` (#2d4221). Represents growth, nature, and stability.
-   **Accent:** `warm-gold` (#d4af37). Signifies magic, value, and the "spark" itself. Used for key call-to-actions and highlights.
-   **Background:** `soft-cream` (#f5f5f0). A gentle, calming canvas that is easy on the eyes.
-   **Neutrals:** `stone` (#a9a9a9). Used for secondary text to create a soft hierarchy.
-   **Supporting Accents:** `sky-blue` (#a4c6de), `terracotta` (#c87560) for action buttons, adding a touch of playfulness.

**Rule:** The palette is intentionally limited to create a cohesive, non-distracting, and premium feel.

### Part 2: App Structure & Layout

#### Component-Based Architecture

The application is built as a single-page application using React, with a clear, linear state machine managed in `App.tsx`. This guides the user through a deliberate, story-like journey.

-   `IntroScreen`: Sets the magical tone with a subtle animation.
-   `WelcomeScreen`: Onboards the user and captures the child's name for personalization.
-   `SparkQuiz`: The interactive core that determines the foundational virtue.
-   `VirtueReveal`: The emotional payoff moment, celebrating the child's primary spark.
-   `CallingSelection`: Connects the abstract virtue to tangible, inspiring future paths.
-   `ImageGeneration`: The technical and magical core where user input (a photo) is transformed via the Gemini API.
-   `ActionStep`: Presents the generated story and artwork, and provides tools for sharing and preservation.
-   `TimeCapsule` & `TimeCapsuleModal`: The gallery of past dreams, encouraging repeat engagement and reflection over time.

#### Layout Principles (The Focused Canvas)

-   **Max content width:** `max-w-2xl`. All content is centered within a generous container, eliminating distractions and focusing the user's attention on the current step.
-   **Responsive Design:** Built mobile-first using Tailwind CSS, ensuring the experience is seamless on any device.
-   **Generous Spacing:** Ample whitespace is used between elements to create a calm, uncluttered, and premium feel.

### Part 3: Feature-by-Feature Strategy

#### The `WelcomeScreen` (The Invitation)

This screen acts as the cover of our storybook.

-   **Layout:** A strong, centered typographic statement establishes the app's core promise: "Don't just see the future. See the spark."
-   **Function:** A single input field for the child's name immediately establishes a personalized journey.
-   *Skill Shown: Clear value proposition, immediate user engagement.*

#### The `SparkQuiz` (The Discovery)

-   **Format:** A simple, two-choice visual quiz. Each option is tied to one of the four core virtues (Compassion, Creativity, Courage, Curiosity).
-   **Visuals:** Placeholder images are used to make the choices feel tangible and fun for a child.
-   **UX:** A progress bar provides a sense of momentum. Smooth transitions between questions keep the user engaged.
-   *Skill Shown: User-centric design (simple choices), clear feedback (progress bar).*

#### The `ImageGeneration` Screen (The Magic)

This is the heart of the DreamLens experience, where we combine user data with AI to create a unique artifact.

-   **Layout:** A clear file upload area with a preview provides confidence. A simple style selector (`Artistic`, `Photorealistic`, `Comic Book`) offers creative control.
-   **Technical Strategy:**
    1.  The user uploads a photo of their child.
    2.  Upon clicking "Weave the Dream", two parallel asynchronous calls are made to the Gemini API (`geminiService.ts`):
        -   `generateStorybookImage`: An image-to-image request using `gemini-2.5-flash-image`. The prompt is carefully engineered to preserve the child's likeness while transforming them into their chosen "calling."
        -   `generateCallingDetails`: A text-to-json request using `gemini-2.5-pro`. The prompt instructs the model to generate a structured JSON object containing a story, a role model, a skill path, and a first step.
    3.  A loading state with encouraging, thematic messages (`"Mixing paints and magic..."`) manages user expectation during the API calls.
-   *Skill Shown: UI/UX sensibility (clear inputs), technical architecture (parallel API calls for efficiency), thoughtful user feedback (loading messages).*

#### The `ActionStep` & `TimeCapsule` (The Memory)

This is where the digital experience translates into real-world connection and memory.

-   **Visual Layout:** The generated image is given hero status. The AI-generated story and details are presented in clean, digestible "InfoCards."
-   **Go-to-Market Strategy:** The action buttons are the app's primary growth engine.
    -   `Save to Spark Time-Capsule`: Encourages long-term retention and repeat usage.
    -   `Share`, `Download`, `Print`: Enable organic, word-of-mouth marketing by giving users tangible artifacts to share with family and friends.
-   **Success Metrics:**
    -   **Engagement:** Percentage of users who complete the flow from quiz to action step.
    -   **Retention:** Number of entries saved to the Time Capsule per user.
    -   **Virality:** Number of shares or downloads initiated from the Action Step.
-   *Skill Shown: Outcome-oriented design, strategic planning (built-in growth loops), data literacy.*

### Part 4: Visual Assets Strategy

-   **Quiz & Calling Images:** Currently using `picsum.photos` as placeholders. A V2 would involve creating a consistent, branded set of illustrations.
-   **The Generated Portrait:** This is the most critical visual asset. The prompting in `geminiService.ts` is highly specific, demanding that the AI **"crucially, preserve the child's unique facial features and likeness"** to create a deeply personal and emotionally resonant image.
-   **Icons:** Simple, universally understood icons (`💖`, `🎨`, `🦁`, `🌍`) are used to represent the virtues, making them instantly recognizable.

### Part 5: Tone & Writing Style

-   **Conversational & Encouraging:** The copy is warm, positive, and speaks directly to the parent and child (e.g., "Let's create the dream for your...").
-   **Magical & Inspiring:** The language used in stories and descriptions aims to spark imagination and wonder.
-   **Simple & Clear:** All instructions are straightforward, ensuring the app is effortless to use.

### Part 6: Tools & Technology Stack

-   **Frontend:** React, TypeScript, Vite
-   **Styling:** Tailwind CSS for rapid, responsive, and utility-first styling.
-   **AI Model (Image):** Google Gemini (`gemini-2.5-flash-image`) for its powerful image editing and generation capabilities.
-   **AI Model (Text):** Google Gemini (`gemini-2.5-pro`) for its structured JSON output and strong reasoning capabilities.
-   **State Management:** React Hooks (`useState`) for simple, local component state.

### Part 7: Roadmap & Future Possibilities

-   **Enhanced Time Capsule:** A persistent backend to store and retrieve time capsule entries across sessions/devices.
-   **Branded Visuals:** Replace placeholder images with a unique, consistent illustration style.
-   **Expanded Content:** Add more virtues, callings, and quiz questions to increase replayability.
-   **Parental Dashboard:** A section for parents with articles and tips on how to nurture their child's discovered "spark."
-   **Localization:** Translate content into multiple languages to reach a global audience.

---

### The Golden Rules of DreamLens

1.  **Clarity over cleverness.** The user flow is linear and intuitive.
2.  **Show, don't tell.** We don't just tell a parent their child has courage; we show them a portrait of their child as a courageous Astronaut.
3.  **Be honest.** The app is a tool for discovery, not a definitive diagnosis of a child's future.
4.  **One idea per screen.** Each step in the flow has a single, clear purpose.
5.  **Whitespace is your friend.** The design is clean and breathable, creating a calm and focused experience.
6.  **The design reflects the thinking.** A clean, thoughtful app for a clean, thoughtful purpose.
