import classNames from 'classnames'

export function Button({ className, children, ...props }) {
  return (
    <button
      className={
        classNames(
          'bg-[#F7DC72] rounded-lg px-4 py-2 min-w-32 text-black',
          className,
        )
      }
      {...props}
    >{ children }</button>
  )
}