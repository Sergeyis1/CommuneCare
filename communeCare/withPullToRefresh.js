import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const withPullToRefresh = (WrappedComponent) => {
  return (props) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <WrappedComponent {...props} />
      </ScrollView>
    );
  };
};

export default withPullToRefresh;
