import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Background from '~/components/Background'

import { Container, Title, List } from './styles'
import Appointment from '~/components/Appointment'
import api from '~/services/api'

export default function Dashboard() {
  const [appointments, setAppointments] = useState([])

  async function handleCancel(appointment_id) {
    const response = await api.delete(`/appointments/${appointment_id}`)
    setAppointments(
      appointments.map(appointment =>
        appointment.id === appointment_id
          ? {
            ...appointment,
            canceled_at: response.data.canceled_at
          }
          : appointment
      )
    )
  }

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('/appointments')
      setAppointments(response.data)
    }
    loadAppointments()
  }, [])
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  )
}
