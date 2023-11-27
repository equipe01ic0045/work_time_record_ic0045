"use client";

import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export default function Clock(props: {
  onDateChange: (date: Date) => void,
  defaultValue?: Date,
}) {
  const [date, setDate] = useState(props.defaultValue || new Date());

  let interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (props.defaultValue) {
      setDate((prev) => (
        prev.getTime() !== props.defaultValue!.getTime()! ? props.defaultValue! : prev
      ));
      return;
    }

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
  }, [props.defaultValue]);

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
