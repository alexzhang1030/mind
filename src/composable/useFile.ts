import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import type { App } from './useData'

const name = 'Alex_Mind'

export const Paths: Record<string, Readonly<string>> = {
  Root: `${name}/database`,
  Image: `${name}/database/images`,
  AppData: `${name}/database/data.json`,
}

async function checkOrCreateDir(path: string) {
  await createDir(path, { dir: BaseDirectory.Data, recursive: true })
}

export async function readFile<T>(path: string, type: 'json' | 'text' = 'text') {
  await checkOrCreateDir(Paths.Image)
  const data = await readTextFile(path, { dir: BaseDirectory.Data })
  return type === 'json' ? JSON.parse(data) as T : data
}

export async function readDataOrCreateInitial() {
  let data = {} as App
  try {
    data = (await readFile(Paths.AppData, 'json') as App)
  }
  catch (e) {
    data = {
      lastId: 0,
      data: [
        {
          id: 1,
          title: 'TypeScript Play',
          description: 'The Playground lets you write TypeScript or JavaScript online in a safe and sharable way.',
          link: 'https://www.typescriptlang.org/play',
          svgPath: 'TypeScript_Play.svg',
        },
      ],
    }
    await writeTextFile(`${Paths.Image}/${data.data[0].svgPath}`, `
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect width="28" height="28" x="2" y="2" fill="#3178c6" rx="1.312"/>
        <path fill="#fff" fill-rule="evenodd" d="M18.245 23.759v3.068a6.492 6.492 0 0 0 1.764.575a11.56 11.56 0 0 0 2.146.192a9.968 9.968 0 0 0 2.088-.211a5.11 5.11 0 0 0 1.735-.7a3.542 3.542 0 0 0 1.181-1.266a4.469 4.469 0 0 0 .186-3.394a3.409 3.409 0 0 0-.717-1.117a5.236 5.236 0 0 0-1.123-.877a12.027 12.027 0 0 0-1.477-.734q-.6-.249-1.08-.484a5.5 5.5 0 0 1-.813-.479a2.089 2.089 0 0 1-.516-.518a1.091 1.091 0 0 1-.181-.618a1.039 1.039 0 0 1 .162-.571a1.4 1.4 0 0 1 .459-.436a2.439 2.439 0 0 1 .726-.283a4.211 4.211 0 0 1 .956-.1a5.942 5.942 0 0 1 .808.058a6.292 6.292 0 0 1 .856.177a5.994 5.994 0 0 1 .836.3a4.657 4.657 0 0 1 .751.422V13.9a7.509 7.509 0 0 0-1.525-.4a12.426 12.426 0 0 0-1.9-.129a8.767 8.767 0 0 0-2.064.235a5.239 5.239 0 0 0-1.716.733a3.655 3.655 0 0 0-1.171 1.271a3.731 3.731 0 0 0-.431 1.845a3.588 3.588 0 0 0 .789 2.34a6 6 0 0 0 2.395 1.639q.63.26 1.175.509a6.458 6.458 0 0 1 .942.517a2.463 2.463 0 0 1 .626.585a1.2 1.2 0 0 1 .23.719a1.1 1.1 0 0 1-.144.552a1.269 1.269 0 0 1-.435.441a2.381 2.381 0 0 1-.726.292a4.377 4.377 0 0 1-1.018.105a5.773 5.773 0 0 1-1.969-.35a5.874 5.874 0 0 1-1.805-1.045Zm-5.154-7.638h4v-2.527H5.938v2.527H9.92v11.254h3.171Z"/>
      </svg>
    `, { dir: BaseDirectory.Data })
    await writeTextFile(Paths.AppData, JSON.stringify(data), { dir: BaseDirectory.Data })
  }
  return data
}

export async function writeFile(filename: string, content: string) {
  await checkOrCreateDir(Paths.Image)
  await writeTextFile(`${Paths.Root}/${filename}`, content, { dir: BaseDirectory.Data })
}

export async function readIcon(relativePath: string) {
  return await readFile(`${Paths.Image}/${relativePath}`, 'text')
}
