import classNames from 'classnames'

export function Button({ className, children }) {
  return (
    <button
      className={
        classNames(
          'bg-gradient-to-tl from-[#031353] via-[#001D77] to-[#0076BC] shadow-[inset_0_2px_1px_0_rgba(112,120,168,0.3)] rounded-lg px-4 py-2 text-lg',
          className,
        )
      }
    >{ children }</button>
  )
}