import { Portal } from 'solid-js/web'
import type { JSX } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import Message from '@/components/Message'

export interface UseMessageProps {
  children: JSX.Element
  delay?: number
}

export const useMessage = (props: UseMessageProps) => {
  const [isShow, setShow] = createSignal(false)

  Portal({
    children: <Message {...props} onClose={() => setShow(false)} />,
    ref: (el) => {
      createEffect(() => {
        el.className = `message-container message-container-${
          isShow() ? 'show' : 'hidden'
        }`
      })
    },
  })

  return { isShow, setShow }
}
