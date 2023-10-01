import { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

import Dropdown, { Group, Option, ReactDropdownProps } from 'react-dropdown'

import styles from './PuzzleDropdown.module.scss'

export type PuzzleDropdownProps = PropsWithChildren<ReactDropdownProps> & {
  options: (Group | Option | string)[]
  error?: string
  disabled?: boolean
}

const PuzzleDropdown: FC<PuzzleDropdownProps> = ({
  options,
  error,
  disabled,
  ...rest
}: PuzzleDropdownProps) => {
  const { placeholderClassName, controlClassName, className, menuClassName } =
    rest
  return (
    <div className={styles.container}>
      <Dropdown
        disabled={disabled}
        options={options}
        {...rest}
        className={classNames(styles.dropdownContainer, {
          [styles.disabled]: disabled,
        })}
        controlClassName={classNames(styles.dropdownControl, controlClassName, {
          [styles.inputError]: error,
        })}
        placeholderClassName={classNames(
          styles.dropdownPlaceholder,
          placeholderClassName
        )}
        arrowClassName={styles.dropdownArrow}
        arrowClosed={
          !disabled && (
            <span className={classNames(styles.arrowClosed, className)} />
          )
        }
        arrowOpen={
          !disabled && (
            <span className={classNames(styles.arrowOpen, className)} />
          )
        }
        menuClassName={classNames(styles.dropdownMenu, menuClassName)}
      />
      <div className={styles.error}>{error}</div>
    </div>
  )
}

export default PuzzleDropdown
