import React from 'react';
import { Appbar, Text } from 'react-native-paper';

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default ContentTitle;