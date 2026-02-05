import { readdir } from 'fs/promises';
import * as path from 'path';

async function importFromFolder(folder: string): Promise<Array<any>> {
    const entries = await readdir(folder, { withFileTypes: true });
    const results: Array<any> = [];

    for (const entry of entries) {
        
        if (!entry.isFile()) continue;
        if (!entry.name.endsWith('.js')) continue;
        
        const fullPath = path.join(folder, entry.name);
        const module = await import(fullPath);
        results.push(module);
    }

    return results;
}

export { importFromFolder }