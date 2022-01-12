import React, { FC } from "react";
import { ReactNode } from "react";

type ConditionalProps = {
  condition: boolean;
  children: ReactNode;
};

export const Conditional: FC<ConditionalProps> = ({
  condition,
  children,
}: ConditionalProps) => <>{condition ? children : null}</>;
