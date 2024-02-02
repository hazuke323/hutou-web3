import classNames from 'classnames'

export function Panel({
  className,
  children,
}) {
  return (
    <div className={
      classNames(
        'text-center rounded-2xl w-full box-content px-1 -translate-x-1 py-7 bg-gradient-to-b from-[#000A29] to-[rgba(0,9,36,0.8)] shadow-[inset_0_1px_2px_0_rgba(135,139,210,0.3)]',
        className,
      )
    }>
      {children}
    </div>
  )
}