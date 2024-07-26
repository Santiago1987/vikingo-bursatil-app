import { useState } from "react";

export const Opciones = () => {
  const [especie, setEspecie] = useState(ini_state);
};

const ini_state = {
  10: [
    {
      call_c: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
      call_v: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
      put_c: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
    },
  ],
  20: [
    {
      call_c: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
      call_v: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
      put_c: [
        { cant: 2, prima: 5 },
        { cant: 3, prima: 7 },
      ],
    },
  ],
};
