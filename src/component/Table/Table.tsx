import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Categories } from "../../store/types";

import "./Table.css";

type TableProps = {
  data: { id: string; name: string; count: number }[];
};

export const Table: FC<TableProps> = (props: TableProps) => {
  return (
    <div className="table">
      <div className="table-header">
        {props.data.map((el) => (
          <p className="table__item">{el.name}</p>
        ))}
      </div>
      <div className="table-content">
        {props.data.map((el) => (
          <p className="table__item">{el.count}</p>
        ))}
      </div>
    </div>
  );
};
