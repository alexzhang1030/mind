import { useDark } from '@colid/core'
import { ImportDialog } from './Actions'
import IconButton from '@/components/IconButton'
import { useDialog } from '@/composable/useDialog'

export const Header = () => {
  const { setIsDark } = useDark()
  const { setShow } = useDialog({
    title: 'Add Website',
    content: <div><ImportDialog /></div>,
  })
  return () => (
    <div text-10 w-full flex justify-between items-start mb-5>
      <span font-lobster lh-10>
        Mind
      </span>

      <div flex>
        <IconButton onclick={() => setShow(true)}>
          <div i-icon-park-outline:plus text-5></div>
        </IconButton>

        <IconButton onclick={() => setIsDark(d => !d)}>
          <div i-carbon-sun dark:i-carbon-moon text-5></div>
        </IconButton>
      </div>
    </div>
  )
}

export default Header

