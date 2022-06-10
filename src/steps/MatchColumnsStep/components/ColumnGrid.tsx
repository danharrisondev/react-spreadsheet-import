import type React from "react"
import type { Column, Columns } from "../MatchColumnsStep"
import { Heading, ModalBody, Table, Tr, Td, useStyleConfig } from "@chakra-ui/react"
import { ContinueButton } from "../../../components/ContinueButton"
import { useRsi } from "../../../hooks/useRsi"
import type { themeOverrides } from "../../../theme"

type ColumnGridProps<T extends string> = {
  columns: Columns<T>
  userColumn: (column: Column<T>) => React.ReactNode
  templateColumn: (column: Column<T>) => React.ReactNode
  onContinue: (val: Record<string, string>[]) => void
}

export type Styles = typeof themeOverrides["components"]["MatchColumnsStep"]["baseStyle"]

export const ColumnGrid = <T extends string>({
  columns,
  userColumn,
  templateColumn,
  onContinue,
}: ColumnGridProps<T>) => {
  const { translations } = useRsi()
  const styles = useStyleConfig("MatchColumnsStep") as Styles

  return (
    <>
      <ModalBody flexDir="column" p={8} overflow="auto">
        <Heading sx={styles.heading}>{translations.matchColumnsStep.title}</Heading>
        <Table>
          {columns.map((column, index) => (
            <Tr key={index}>
              <Td>{column.header}</Td>
              <Td>{templateColumn(column)}</Td>
            </Tr>
          ))}
        </Table>
      </ModalBody>
      <ContinueButton onContinue={onContinue} title={translations.matchColumnsStep.nextButtonTitle} />
    </>
  )
}
