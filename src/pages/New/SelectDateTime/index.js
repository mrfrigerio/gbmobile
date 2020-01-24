import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Background from '~/components/Background'
import DateInput from '~/components/DateInput'
import api from '~/services/api'

import { Container, HourList, Hour, Title } from './styles'

export default function SelectDateTime({ navigation }) {
  const provider = navigation.getParam('provider')
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState([])
  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`/providers/${provider.id}/available`, {
        params: {
          date: date.getTime()
        }
      })
      console.tron.log(response.data)
      setHours(response.data)
    }
    loadAvailable()
  }, [date, provider.id])

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          extraData={hours}
          keyExtractor={item => item.time}
          renderItem={({ item: hour }) => (
            <Hour
              onPress={() =>
                navigation.navigate('Confirm', { provider, time: hour.value })
              }
              enabled={hour.available}>
              <Title>{hour.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  )
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  )
})
