import fs from 'fs';
import path from 'path';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseMarkdownFiles() {
  const rootDir = process.cwd();
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.md') && f !== 'README.md');

  // Sort files predictably
  files.sort((a, b) => a.localeCompare(b));

  const speakers = files.map((filename, index) => {
    const filePath = path.join(rootDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract Name (# Name)
    const nameMatch = content.match(/^#\s+(.+)$/m);
    const name = nameMatch ? nameMatch[1].trim() : filename.replace('.md', '');

    // Extract Role (**Role**)
    const roleMatch = content.match(/\*\*(.+?)\*\*/);
    const role = roleMatch ? roleMatch[1].trim() : '';

    // Extract Intro / Opening
    const introMatch = content.match(/###\s+افتتاحية\s+([\s\S]*?)(?=###\s+الأسئلة|$)/);
    let introduction = introMatch ? introMatch[1].trim() : '';
    // Clean blockquotes or leading > if present
    introduction = introduction.replace(/^>\s*/gm, '').trim();

    // Extract Questions
    const questionsSectionMatch = content.match(/###\s+الأسئلة\s+([\s\S]*)/);
    const qText = questionsSectionMatch ? questionsSectionMatch[1] : '';

    const questions = [];
    const qRegex = /(?:^\*\*(\d+)\.\*\*|^\b(\d+)\.\b)\s*([\s\S]*?)(?=(?:^\*\*(\d+)\.\*\*|^\b(\d+)\.\b)|$)/gm;

    let match;
    while ((match = qRegex.exec(qText)) !== null) {
      const qNum = parseInt(match[1] || match[2], 10);
      let qBody = match[3].trim();
      if (qNum) {
        questions.push({
          id: qNum,
          question: qBody,
          responseNote: 'تعقيب'
        });
      }
    }

    const id = slugify(filename.replace('.md', ''));

    return {
      id,
      name,
      role,
      avatar: `/assets/avatars/${id}.svg`,
      introduction,
      questions,
      status: 'not_interviewed',
      originalIndex: index
    };
  });

  const outputCode = `// Generated automatically from Markdown sources - DO NOT EDIT MANUALLY
import { Speaker } from '../types/speaker';

export const SPEAKERS_DATA: Speaker[] = ${JSON.stringify(speakers, null, 2)};
`;

  fs.writeFileSync(path.join(rootDir, 'src/data/speakersData.ts'), outputCode, 'utf8');
  console.log(`Successfully generated src/data/speakersData.ts with ${speakers.length} speakers.`);
}

parseMarkdownFiles();
