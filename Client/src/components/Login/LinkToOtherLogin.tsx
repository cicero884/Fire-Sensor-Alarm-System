import * as React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { Link } from '../Router'

const Label = styled(Text)`
  	font-family: AvantGardePro;
  	color: var(--light-grayish-blue);
`

const LinkToOtherLogin = (props: { isFireFighter: boolean }) => (
	<View style={{ marginTop: 50 }}>
		<Label>
			Looking for{' '}
			{props.isFireFighter ? (
				<Link to="/citizen/login">
					<Label>citizen login</Label>
				</Link>
			) : (
					<Link to="/firefighter/citizen/login">
						<Label>firefighter login</Label>
					</Link>
				)}
			?</Label>
	</View>
)

export default LinkToOtherLogin
