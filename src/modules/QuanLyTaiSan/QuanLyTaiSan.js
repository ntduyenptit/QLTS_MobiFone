import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar } from 'react-native';
import LoaderComponent from '../global/LoaderComponent';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';

export default function QuanLyTaiSan(props) {
  const [scrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )
  const array = [
    {
        "name": "Bộ Micro hội thảo LHY-530 (2)",
        "maTS": "2403000060000000000002F5",
        "position": "Tầng 8",
        "color": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
    },
    {
        "name": "Màn chiếu Lyscreen",
        "maTS": "24030000E0000000000002F4",
        "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "24030000E0000000000002F3",
      "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "24030000E0000000000002F2",
      "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "24030000E0000000000002F1",
      "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "24030000E0000000000002F0",
      "position": "Tầng 8",
        "color": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "24030000E0000000000002EF",
      "position": "Tầng 8",
        "color": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "2403000130000000000002EE",
      "position": "Tầng 8",
        "color": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "2403000130000000000002ED",
      "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
    },
    {
      "name": "Màn chiếu Lyscreen",
      "maTS": "2403000060000000000002EC",
      "position": "Tầng 8",
        "color": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
    }
];
  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            paddingTop: 55
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        > 
          {LoaderComponent(array,props)}
        </Animated.ScrollView>
      </SafeAreaView>
      <FilterComponent />
    </Animated.View>
  );
};
