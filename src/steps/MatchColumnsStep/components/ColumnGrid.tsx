import type React from "react"
import type { Column, Columns } from "../MatchColumnsStep"
import { Box, Flex, Heading, ModalBody, Text, Table, Tr, Td, useStyleConfig } from "@chakra-ui/react"
import { FadingWrapper } from "../../../components/FadingWrapper"
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
        <Flex
          flex={1}
          display="grid"
          gridTemplateRows="auto auto auto 1fr"
          gridTemplateColumns={`0.75rem repeat(${columns.length}, minmax(18rem, auto)) 0.75rem`}
        >
          <Box gridColumn={`1/${columns.length + 3}`}>
            <Text sx={styles.title}>{translations.matchColumnsStep.userTableTitle}</Text>
          </Box>
          {columns.map((column, index) => (
            <Box gridRow="2/3" gridColumn={`${index + 2}/${index + 3}`} pt={3} key={column.header}>
              {userColumn(column)}
            </Box>
          ))}
          <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="2/3" />
          <Box gridColumn={`1/${columns.length + 1}`} mt={7}>
            <Text sx={styles.title}>{translations.matchColumnsStep.templateTitle}</Text>
          </Box>
          <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="4/5" />
        </Flex>
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
