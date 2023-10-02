import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMask } from '@react-input/mask'
import { Check } from '../../components/UI/Check/Check'
import Input from '../../components/UI/Input'
import { Button } from '../../components/importFileComponents'
import styles from './Home.module.scss'
import { ProjectType } from '../../@types/types/projectsType'
import { validationRules } from '../../@types/validationRules'
import PuzzleDropdown from '../../components/UI/PuzzleDropdown/PuzzleDropdown'
import { useEffect, useState } from 'react'
import { currencyData } from '../../@types/data'
import { euroToUsdExchangeRates, options } from '../../@types/constant'

const Home = () => {
  const [curSumEuro, setCurSumEuro] = useState('0')
  const [checkInformation, setCheckInformation] = useState(false)
  const [checkSave, setCheckSave] = useState(false)
  const [rate, setRate] = useState(0)
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProjectType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      cartNumber: '',
      currency: 'BYN',
      sum: 0,
    },
    mode: 'onBlur',
  })

  const getValueCurrency = (value: string) =>
    value ? options.find((opt) => opt.value === value) : ''

  const inputRef = useMask({
    mask: '____ - ____ - ____ - ____',
    replacement: { _: /\d/ },
  })

  const onSubmit: SubmitHandler<ProjectType> = () => {
    setCheckInformation(true)
    window.scrollTo({ top: 99999, left: 0, behavior: 'smooth' })
  }

  const checkSum = () => {
    let s = +curSumEuro * euroToUsdExchangeRates
    let sProcent = (s / 100) * 2
    let sum = s - sProcent
    return `${String(sum.toFixed(2))} $`
  }
  const total = checkSum()

  const saveForm: SubmitHandler<ProjectType> = (data) => {
    console.log({ ...data, curSumEuro, total, servicesCommission: '2%' })
  }

  useEffect(() => {
    const cur = currencyData.find((value) =>
      value.name === watch('currency') ? value : null
    )
    const sum = watch('sum') / (cur ? cur.exchangeEuroValue : 0)
    setRate(cur ? cur.exchangeEuroValue : 0)
    setCurSumEuro(String(sum.toFixed(2)))
    setCheckInformation(false)
  }, [watch('currency'), watch('sum')])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>Difficult converter</h3>
          <div className={styles.info}>
            <div className={styles.subtitle}>Information</div>
            <Controller
              control={control}
              name="firstName"
              rules={validationRules.firstName}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  name="firstName"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('firstName')
                  }}
                  value={value}
                  type="text"
                  placeholder="Name"
                  errorInput={errors.firstName?.message}
                  message={'* The name must contain only letters, no numbers.'}
                  activeInput={!!value}
                  disabled={checkSave}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={validationRules.lastName}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  name="lastName"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('lastName')
                  }}
                  value={value}
                  type="text"
                  placeholder="Surname"
                  errorInput={errors.lastName?.message}
                  message={
                    '* The surname must contain only letters, no numbers.'
                  }
                  activeInput={!!value}
                  disabled={checkSave}
                />
              )}
            />
            <Controller
              control={control}
              name="cartNumber"
              rules={validationRules.cartNumber}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  inputRef={inputRef}
                  name="cartNumber"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('cartNumber')
                  }}
                  value={value}
                  type="text"
                  placeholder="Bank card number"
                  errorInput={errors.cartNumber?.message}
                  message={
                    '* Enter the number indicated on the front of your card'
                  }
                  activeInput={!!value}
                  disabled={checkSave}
                />
              )}
            />
          </div>
          <div className={styles.innerChange}>
            <div className={styles.itemChange}>
              <div className={styles.subtitle}>You Cahge</div>
              <Controller
                control={control}
                name="currency"
                rules={validationRules.currency}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <PuzzleDropdown
                    options={options}
                    className={styles.phoneInput}
                    placeholder={'Currency'}
                    value={getValueCurrency(value)}
                    onChange={(newValue) => onChange(newValue.value)}
                    error={error?.message}
                    disabled={checkSave}
                  />
                )}
              />
              <Controller
                control={control}
                name="sum"
                rules={validationRules.sum}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    name="sum"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={() => {
                      clearErrors('sum')
                    }}
                    value={value}
                    type="number"
                    placeholder="Enter sum"
                    errorInput={errors.sum?.message}
                    message={'* Enter the number sum'}
                    activeInput={!!value}
                    disabled={checkSave}
                  />
                )}
              />
            </div>
            <div className={styles.itemChange}>
              <div className={styles.subtitle}>Additional currency</div>
              <PuzzleDropdown
                disabled={true}
                options={options}
                className={styles.phoneInput}
                value={'EUR'}
              />
              <PuzzleDropdown
                disabled={true}
                options={options}
                className={styles.phoneInput}
                value={curSumEuro}
              />
            </div>
          </div>
          <div>
            <div className={styles.subtitle}> Total amount in $</div>
            <PuzzleDropdown
              disabled={true}
              options={options}
              className={styles.phoneInput}
              value={checkSum()}
            />
          </div>
          <div className={styles.innerBtn}>
            <div className={styles.subtitle}> CHECK BUTTON</div>
            <Button
              onClick={() => setCheckInformation(true)}
              title={'CHECK INFORMATION'}
              disabled={
                errors.firstName ||
                errors.lastName ||
                errors.cartNumber ||
                errors.sum ||
                !watch('firstName') ||
                !watch('lastName') ||
                !watch('cartNumber') ||
                !watch('sum')
                  ? true
                  : false
              }
            />
          </div>
          {checkInformation && (
            <Check
              setCheckSave={setCheckSave}
              save={handleSubmit(saveForm)}
              reset={reset}
              name={watch('firstName')}
              surname={watch('lastName')}
              card={watch('cartNumber')}
              sum={watch('sum')}
              AdditionalCurency={curSumEuro}
              total={total}
              currency={watch('currency')}
              rate={rate}
              curSumEuro={curSumEuro}
            />
          )}
        </div>
      </div>
    </form>
  )
}

export default Home
