import { ChangeEvent, FC, HTMLInputTypeAttribute, useState } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

import styles from './Input.module.scss'

type InputProps = {
  value: string | number | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  onFocus: () => void
  type: HTMLInputTypeAttribute
  placeholder: string
  name: string
  message?: string
  errorInput?: string
  activeInput: boolean
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  disabled: boolean
}

const errorVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { y: 3, opacity: 0 },
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  message,
  errorInput,
  activeInput,
  onBlur,
  onFocus,
  inputRef,
  disabled,
}) => {
  const [renderingType, setRenderingType] = useState(type)
  const [isFocus, toggleIsFocus] = useState(false)

  const handleFocus = () => {
    onFocus()
    toggleIsFocus(true)
  }

  const handleBlur = () => {
    onBlur()
    toggleIsFocus(false)
  }
  return (
    <div className={styles.wrapper}>
      <input
        disabled={disabled}
        className={classNames(styles.input, {
          [styles.errorInput]: !!errorInput,
          [styles.disabled]: disabled,
        })}
        name={name}
        value={value ? value : ''}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type={renderingType}
        ref={inputRef}
      />
      {!activeInput && (
        <span
          className={classNames(styles.placeholder, {
            [styles.errorPlaceholder]: !!errorInput,
          })}
        >
          {placeholder} {<span>*</span>}
        </span>
      )}
      {errorInput && !isFocus && (
        <motion.p
          className={classNames(styles.error)}
          variants={errorVariants}
          initial="hidden"
          animate="visible"
        >
          {errorInput}
        </motion.p>
      )}
      {activeInput && !errorInput && isFocus && (
        <motion.p
          className={classNames(styles.message)}
          variants={errorVariants}
          initial="hidden"
          animate="visible"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

export default Input
