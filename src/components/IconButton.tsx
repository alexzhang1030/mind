import type { Component, ParentProps } from 'solid-js'

type IconButtonProps = ParentProps<{
  onclick?: () => void
}>

const IconButton: Component<IconButtonProps> = (props) => {
  const { onclick, children } = props
  return (
    <div
      onclick={onclick}
      cursor-pointer
      w-10
      h-10
      flex
      justify-center
      items-center
      rounded-3
      dark:text="#98CFCF"
      hover="bg-o"
      transition-colors
    >
      {children}
    </div>
  )
}

export default IconButton
