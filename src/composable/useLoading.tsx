import { Portal } from 'solid-js/web'
import { createEffect, createSignal } from 'solid-js'
import Loading from '@/components/Loading'

export const useLoading = () => {
  const [isShow, setShow] = createSignal(false)

  Portal({
    children: <Loading />,
    ref: (el) => {
      createEffect(() => {
        el.className = `loading-overlay loading-overlay-${
          isShow() ? 'show' : 'hidden'
        }`
      })
    },
  })

  return { isShow, setShow }
}
