import { invoke } from '@tauri-apps/api'
import type { Accessor } from 'solid-js'
import { createRenderEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useDialog } from '../composable/useDialog'
import { useLoading } from '../composable/useLoading'

type Accessors = [Accessor<string>, (v: string) => void]

interface InputProps {
  name: string
  accessor: Accessors
}

export function model(el: HTMLInputElement, accessor: () => Accessors) {
  const [get, set] = accessor()
  el.addEventListener('input', (e) => {
    set((e.target as HTMLInputElement).value)
  })
  createRenderEffect(() => el.value = get())
}

export const Input = ({ name, accessor }: InputProps) => {
  return (
    <div w-full>
      <label for="email" sr-only>{name}</label>
      <div relative>
        <input
          type="text"
          w-full rounded-lg border-gray-200 dark:border-gray-800 border-1 p-4 pr-12 text-sm shadow-sm
          dark:bg-gray-500 dark:outline-none
          placeholder={`Please type ${name}`}
          required
          use:model={accessor}
        />
      </div>
    </div>
  )
}

const [form, setForm] = createStore({
  name: '',
  link: '',
})

export const ImportDialog = () => {
  return (
    <div py-5 flex="~ wrap" gap-5>
      <Input name="website name" accessor={[() => form.name, (v) => { setForm({ name: v }) }]} />
      <Input name="website link" accessor={[() => form.link, (v) => { setForm({ link: v }) }]} />
    </div>
  )
}
const { setShow: setLoadingShow } = useLoading()

const { setShow: setImportShow } = useDialog({
  title: 'Add Website',
  content: <ImportDialog />,
  async onConfirm() {
    setLoadingShow(true)
    const res = await invoke<{ title: string; desc: string }>('fetch_title_description', { link: form.link })
    setLoadingShow(false)

    // eslint-disable-next-line no-console
    console.log(res)
  },
})

export const showImport = () => {
  setImportShow(true)
}
