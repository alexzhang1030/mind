import type { ParentComponent, ParentProps } from 'solid-js'
import { createEffect } from 'solid-js'

type MessageProps = ParentProps<{
  delay?: number
  onClose: () => void
}>

const Message: ParentComponent<MessageProps> = (props) => {
  const { children, onClose, delay = 5000 } = props

  createEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, delay)

    return () => clearTimeout(timer)
  })

  return (
    <div class="message-wrapper">
      {children}
      <div i-carbon-close ml-4 cursor-pointer onClick={onClose} />
    </div>
  )
}

export default Message
