import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { parseISO, formatRelative } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Left, Avatar, Info, Name, Time } from './styles'

export default function Appointment({ data, onCancel }) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt_BR,
      addSuffix: true
    })
  }, [data.date])

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{parsedDate}</Time>
        </Info>
      </Left>

      <TouchableOpacity
        onPress={onCancel}
        style={{
          display: `${data.cancellable && !data.canceled_at ? 'flex' : 'none'}`
        }}>
        <Icon name="event-busy" size={20} color="#f64c75" />
      </TouchableOpacity>
    </Container>
  )
}
