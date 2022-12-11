type PreAssessmentType =
  | "recyclableMaterials"
  | "energyPhotoVolatic"
  | "energyEfficient";

const recylableMaterials: any = {
  books: "Books",
  cardboards: "Cardboards",
  magazines: "Magazines",
  mixedPaper: "Mixed Paper",
  newspapers: "Newspapers",
  plasticsPets: "Plastics Pets",
  plasticsHDPE: "Plastics HDPE",
  plasticsLDE: "Plastics LDPE",
  ldpeCldpe: "LDPE & CLDPE",
  plasticsPVC: "Plastics PVC",
  metalScraps: "Metal Scraps",
  metalMixedCans: "Metal Mixed Cans",
  electromagneticWaste: "Electromagnetic Waste",
  glass: "Glass",
  mixedRecycling: "Mixed Recycling",
};

const energyPhotoVolatic: any = {
  panel: "Number of type I consumers",
  battery: "Number of type II consumers",
  cloudCover: "Number of type II consumers",
  inverter: "Number of type IV consumer",
};
const energyEfficient: any = {
  stoveNumber: "Number",
  yearlyInstallation: "Yearly Installation",
};

export interface PreAssDataSource {
  key: number;
  index: number | string;
  name: string;
  value: number;
}

export const PreAssessmentColumn = [
  {
    title: "S/N",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "index",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "index",
  },
];

export default function PreAssessmentDataSourceGen(
  formValues: any,
  type: PreAssessmentType,
  total: number
): PreAssDataSource[] | undefined {
  delete formValues.referenceId;
  if (type === "recyclableMaterials") {
    const dataSource = Object.keys(formValues).reduce(
      (acc: PreAssDataSource[], curr, index) => {
        if (curr === "referenceId") return acc;

        return [
          ...acc,
          {
            key: index + 1,
            index: index + 1,
            name: recylableMaterials[curr],
            value: formValues[curr],
          },
        ];
      },
      []
    );
    dataSource.push({
      key: dataSource.length + 1,
      index: "",
      name: "Total",
      value: total,
    });
    return dataSource;
  }
  if (type === "energyPhotoVolatic") {
    const dataSource = Object.keys(formValues).reduce(
      (acc: PreAssDataSource[], curr, index) => {
        if (curr === "referenceId") return acc;
        return [
          ...acc,
          {
            key: index + 1,
            index: index + 1,
            name: energyPhotoVolatic[curr],
            value: formValues[curr],
          },
        ];
      },
      []
    );
    dataSource.push({
      key: dataSource.length + 1,
      index: "",
      name: "Total",
      value: total,
    });
    return dataSource;
  }
  if (type === "energyEfficient") {
    const dataSource = Object.keys(formValues).reduce(
      (acc: PreAssDataSource[], curr, index) => {
        if (curr === "referenceId") return acc;
        return [
          ...acc,
          {
            key: index + 1,
            index: index + 1,
            name: energyEfficient[curr],
            value: formValues[curr],
          },
        ];
      },
      []
    );
    dataSource.push({
      key: dataSource.length + 1,
      index: "",
      name: "Total",
      value: total,
    });
    return dataSource;
  }
}
