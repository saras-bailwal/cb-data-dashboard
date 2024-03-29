import React from 'react';
import { useAppSelector } from '@/store/features/store';
import DailyHabitList from '@/components/DailyHabitList';

const DailyHabits = () => {

    return (
        <><h1>Daily Habits page</h1><DailyHabitList /></>
    )
}

export default DailyHabits;