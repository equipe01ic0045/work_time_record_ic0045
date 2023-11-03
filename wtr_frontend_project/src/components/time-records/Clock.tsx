"use client";

import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export default function Clock(props: { onDateChange: (date: Date) => void }) {
  const [date, setDate] = useState(new Date());

  let interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      const newDate = new Date();

      setDate((prevDate) => {
        if (prevDate.getMinutes() !== newDate.getMinutes()) {
          return newDate;
        }

        return prevDate;
      });
    }, 500);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  const onInputChange = (inputDate: Date | null) => {
    if (!inputDate) return;
    if (interval.current) clearInterval(interval.current);

    interval.current = null;
    setDate(inputDate);
    props.onDateChange(date);
  };

  return (
    <FormControl>
      <FormLabel>Horário:</FormLabel>
      <Input
        placeholder="Select Date and Time"
        size="lg"
        variant="filled"
        bg="white"
        type="datetime-local"
        value={dayjs(date).format("YYYY-MM-DDTHH:mm")}
        onChange={e => onInputChange(new Date(e.target.value))}
      />
      <FormHelperText>
        Caso altere a data/horário, será necessário justificar.
      </FormHelperText>
    </FormControl>
  );
}
