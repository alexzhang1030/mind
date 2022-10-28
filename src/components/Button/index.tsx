import type { Component, ComponentProps, ParentProps } from 'solid-js'
import './index.css'

interface IButtonProps extends ComponentProps<'button'> {
  bType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

const Button: Component<ParentProps<IButtonProps>> = (props) => {
  const { bType = 'default', children, ...rest } = props

  return (
    <button
      class={`button-base button-${bType}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
