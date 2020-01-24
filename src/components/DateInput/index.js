import React, { useState, useMemo } from 'react'
import { Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, DateButton, DateText } from './styles'

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false)
  const dateFormatted = useMemo(() => {
    if (Platform.OS !== 'ios') setOpened(false)
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt_BR })
  }, [date])

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DateTimePicker
          value={date}
          onChange={(event, pickedDate) =>
            pickedDate ? onChange(pickedDate) : setOpened(false)
          }
          minimumDate={new Date()}
          locale="pt"
          mode="date"
          display="spinner"
        />
      )}
    </Container>
  )
}
