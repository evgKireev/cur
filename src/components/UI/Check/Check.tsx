import { UseFormReset } from 'react-hook-form'
import { euroToUsdExchangeRates } from '../../../@types/constant'
import { ProjectType } from '../../../@types/types/projectsType'
import Button from '../Button/Button'
import styles from './Check.module.scss'

type CheckType = {
  name: string
  surname: string
  card: string
  sum: number
  AdditionalCurency: string
  total: string
  currency: string
  rate: number
  curSumEuro: string
  reset: UseFormReset<ProjectType>
  save: any
  setCheckSave: React.Dispatch<React.SetStateAction<boolean>>
}

export const Check: React.FC<CheckType> = ({
  name,
  surname,
  card,
  sum,
  AdditionalCurency,
  total,
  currency,
  rate,
  curSumEuro,
  reset,
  setCheckSave,
  save,
}) => {
  const maskName = (str: string) => {
    const arrStr = str.split('')
    for (let i = 0; i < arrStr.length; i++) {
      const index = i
      if (index <= 1) {
        arrStr[i] = arrStr[i]
      } else if (arrStr[arrStr.length - 1] === arrStr[i]) {
        arrStr[i] = arrStr[i]
      } else {
        arrStr[i] = '*'
      }
    }
    return arrStr
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.checkInfo}>
          <div className={styles.title}>Check information</div>
          <div className={styles.checkInfoInner}>
            <div>
              <b>Name:</b> {maskName(name)}
            </div>
            <div>
              <b>Surname:</b> {maskName(surname)}
            </div>
            <div>
              <b>Back Card:</b>{' '}
              {`${card[0]}${card[1]}** - **** - ${card[14]}${card[15]}** - **${card[23]}${card[24]}`}
            </div>
            <div>
              <b>Your Currncy:</b> {sum} {currency}
            </div>
            <div>
              <b>Additional Curency:</b> {AdditionalCurency} EUR
            </div>
            <div className={styles.for}>
              <div>{`You convert ${sum} ${currency}`}</div>
              <div>{`EUR to ${currency} exchange rate ${rate}- total: ${curSumEuro} EUR`}</div>
              <div>{`EUR to USD ${euroToUsdExchangeRates} - total: ${(
                +curSumEuro * euroToUsdExchangeRates
              ).toFixed(2)} USD - service commission 2%`}</div>
            </div>
          </div>
        </div>
        <div className={styles.checkTotal}>
          <div className={styles.total}>Total amount</div>
          <div className={styles.total}>{total.slice(0, -1)}</div>
          <div className={styles.total}>USD</div>
        </div>
      </div>
      <div className={styles.innerBtn}>
        <Button
          title={'Yes, convert'}
          onClick={() => {
            save()
            setCheckSave(true)
          }}
        />
        <Button
          title={'Reset'}
          onClick={() => {
            reset()
            setCheckSave(false)
          }}
        />
      </div>
    </div>
  )
}
