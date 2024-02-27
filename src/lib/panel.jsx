import classNames from 'classnames'

export function Panel({
  className,
  children,
}) {
  return (
    <div className={
      classNames(
        'text-center rounded-2xl box-content px-1 py-7 bg-[#4B5791] m-6',
        className,
      )
    }>
      {children}
    </div>
  )
}