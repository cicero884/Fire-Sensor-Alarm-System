import * as React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { Link } from '../../../components/Router'

const Label = styled(Text)`
  font-family: AvantGardePro;
  color: var(--light-grayish-blue);
`

const LinkToOtherLogin = (props: { isFireFighter: boolean }) => (
  <View style={{ marginTop: 50 }}>
    {props.isFireFighter ? (
      <Label>
        Looking for{' '}
        <Link to="/citizen/login">
          <Label>tenant login</Label>
        </Link>
        ?
      </Label>
    ) : (
      <Label>
        Looking for{' '}
        <Link to="/firefighter/citizen/login">
          <Label>landlord login</Label>
        </Link>
        ?
      </Label>
    )}
  </View>
)

export default LinkToOtherLogin
