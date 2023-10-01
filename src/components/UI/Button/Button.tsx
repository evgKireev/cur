import { FC, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

type ButtonProps = {
  title: string | ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const { title, onClick, className, disabled } = props
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button
