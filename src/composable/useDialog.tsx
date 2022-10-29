import type { JSX } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import { Portal, Show } from 'solid-js/web'
import IconButton from '@/components/IconButton'

const Dialog = (props: DialogChildrenProps) => {
  const { header, children, footer, setShow } = props
  return (
    <div bg-white dark:bg="[var(--dp-color)]" py-2 px-4>
      <div w-full h-8 flex justify-between items-center border-b>
        <Show when={!!header} fallback={<div />}>
          {header}
        </Show>
        <IconButton onclick={() => setShow(false)}>
          <div i-carbon-close text-5></div>
        </IconButton>
      </div>

      {children}

      <Show when={!!footer} fallback={<div />}>
        {footer}
      </Show>
    </div>
  )
}

interface UseDialogParams {
  header?: JSX.Element
  children: JSX.Element
  footer?: JSX.Element
}

type DialogChildrenProps = UseDialogParams & {
  setShow: (show: boolean) => void
}

export const useDialog = (params: UseDialogParams) => {
  const [isShow, setShow] = createSignal(false)

  Portal({
    children: <Dialog {...params} setShow={setShow} />,
    ref: (el) => {
      createEffect(() => {
        el.className = `mind-dialog mind-dialog-${
          isShow() ? 'show' : 'hidden'
        }`
      })
    },
  })

  return { isShow, setShow }
}
