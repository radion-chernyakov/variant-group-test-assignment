"use client"

import { faker } from "@faker-js/faker"
import * as stylex from "@stylexjs/stylex"
import { useState, useRef, useEffect, use } from "react"
import { useZorm } from "react-zorm"
import z from "zod"
import { ErrorMessage, InputContainer } from "~/components/ApplicationForm"
import Button from "~/ui/Button"
import Input from "~/ui/Input"
import PageHeader from "~/ui/PageHeader"
import Switch from "~/ui/Switch"
import Text from "~/ui/Text"
import { type Result } from "~/utils/result"

import { spacing } from "../ui/tokens.stylex"
import { setSettings, useClientSettings } from "./clientSettings"
import { templateBasedLetter } from "./letter"
import { strToBool, type Settings } from "./settingsSchema"
import { clearApplications, addApplications } from "./store"

export default function ApplicationSettingsForm({
  runtimeSettings,
  setSettings,
}: {
  runtimeSettings: Settings
  setSettings: (settings: Settings) => Promise<void>
}) {
  return (
    <div {...stylex.props(styles.container)}>
      <RuntimeSettingsForm
        initialValues={runtimeSettings}
        setSettings={setSettings}
      />
      <ApplicationsActions />
      <PerformanceSpinner />
      <ClientSettingsForm />
    </div>
  )
}

function ApplicationsActions() {
  const [populateApplicationsAmount, setPopulateApplicationsAmount] =
    useState(0)

  return (
    <div {...stylex.props(styles.section)}>
      <PageHeader>Actions with applications</PageHeader>
      <Button
        alignSelf="flex-start"
        size="small"
        intent="action"
        onClick={() => clearApplications()}
      >
        Clear all actions
      </Button>
      <Button
        alignSelf="flex-start"
        size="small"
        intent="action"
        onClick={() => {
          localStorage.setItem("applications", "{foo: 'bar'}")
          window.history.back()
        }}
      >
        Ruin data in local storage & reload
      </Button>
      <div {...stylex.props(styles.populateApplicationsSection)}>
        <Input
          type="range"
          min={0}
          max={6000}
          value={populateApplicationsAmount}
          onChange={(e) =>
            setPopulateApplicationsAmount(parseInt(e.target.value, 10))
          }
        />
        <Button
          alignSelf="flex-start"
          size="small"
          intent="action"
          onClick={() => {
            const applications = [
              ...generateApplications(populateApplicationsAmount),
            ]
            addApplications(applications)
          }}
        >
          {`Populate ${populateApplicationsAmount} actions`}
        </Button>
        <Button
          alignSelf="flex-start"
          size="small"
          intent="action"
          onClick={() => {
            const generatorInstance = batchGeneration(
              generateApplications,
              populateApplicationsAmount,
              500,
            )()
            for (const applications of generatorInstance) {
              requestIdleCallback(() => {
                addApplications(applications)
              })
            }
          }}
        >
          {`Populate ${populateApplicationsAmount} actions (non-sync)`}
        </Button>
      </div>
    </div>
  )
}

export const runtimeFromSchema = z.object({
  simulateDelay: z
    .union([z.literal("on"), z.literal("off")])
    .transform(strToBool)
    .default("off"),
  simulateServerError: z
    .union([z.literal("on"), z.literal("off")])
    .transform(strToBool)
    .default("off"),
  useGPT: z
    .union([z.literal("on"), z.literal("off")])
    .transform(strToBool)
    .default("off"),
})

function RuntimeSettingsForm({
  initialValues,
  setSettings,
}: {
  initialValues: Settings
  setSettings: (settings: Settings) => Promise<void>
}) {
  const [submitResult, setSubmitResult] = useState<Result<Settings> | null>(
    null,
  )
  const form = useZorm("settings", runtimeFromSchema, {
    onValidSubmit: async (e) => {
      e.preventDefault()
      try {
        setSubmitResult({ loading: true })
        await setSettings(e.data)
        setSubmitResult({ data: e.data })
      } catch {
        setSubmitResult({ error: "Failed to save settings" })
      }
    },
  })
  const [simulateDelay, setSimulateDelay] = useState(
    initialValues.simulateDelay,
  )
  const [useGPT, setUseGPT] = useState(initialValues.useGPT)
  const [simulateServerError, setSimulateServerError] = useState(
    initialValues.simulateServerError,
  )

  return (
    <form ref={form.ref} {...stylex.props(styles.section)}>
      <PageHeader>Runtime settings</PageHeader>
      <InputContainer
        layout="horizontal"
        label="Simulate delay"
        renderInput={(id) => (
          <>
            <Switch
              name="simulateDelay"
              id={id}
              value={simulateDelay}
              onChange={setSimulateDelay}
            />
          </>
        )}
        errorMessage={form.errors.simulateDelay()?.message}
      />
      <InputContainer
        layout="horizontal"
        label="Use OpenAI API"
        renderInput={(id) => (
          <>
            <Switch name="useGPT" id={id} value={useGPT} onChange={setUseGPT} />
          </>
        )}
        errorMessage={form.errors.useGPT()?.message}
      />
      <InputContainer
        layout="horizontal"
        label="Simulate server error"
        renderInput={(id) => (
          <Switch
            name="simulateServerError"
            id={id}
            value={simulateServerError}
            onChange={setSimulateServerError}
          />
        )}
        errorMessage={form.errors.simulateServerError()?.message}
      />
      {submitResult?.error && <ErrorMessage message={submitResult.error} />}
      <Button
        alignSelf="flex-start"
        type="submit"
        size="small"
        loading={submitResult?.loading}
      >
        Save
      </Button>
    </form>
  )
}

export const clientFormSchema = z.object({
  deferredApplicationsRendering: z
    .union([z.literal("on"), z.literal("off")])
    .transform(strToBool)
    .default("off"),
  virtualizedApplicationsRendering: z
    .union([z.literal("on"), z.literal("off")])
    .transform(strToBool)
    .default("off"),
})

function ClientSettingsForm() {
  const settings = useClientSettings()

  const form = useZorm("clientSettings", clientFormSchema, {
    onValidSubmit: async (e) => {
      e.preventDefault()
      setSettings(e.data)
    },
  })

  const [deferredApplicationsRendering, setDeferredApplicationsRendering] =
    useState(settings.deferredApplicationsRendering)
  const [
    virtualizedApplicationsRendering,
    setVirtualizedApplicationsRendering,
  ] = useState(settings.virtualizedApplicationsRendering)

  return (
    <form {...stylex.props(styles.section)} ref={form.ref}>
      <PageHeader>Client settings</PageHeader>
      <InputContainer
        layout="horizontal"
        label="Use `useDeferredValue` for applications rendering"
        renderInput={(id) => (
          <>
            <Switch
              name="deferredApplicationsRendering"
              id={id}
              value={deferredApplicationsRendering}
              onChange={setDeferredApplicationsRendering}
            />
          </>
        )}
        errorMessage={form.errors.deferredApplicationsRendering()?.message}
      />
      <InputContainer
        layout="horizontal"
        label="use `react-window` for applications rendering"
        renderInput={(id) => (
          <>
            <Switch
              name="virtualizedApplicationsRendering"
              id={id}
              value={virtualizedApplicationsRendering}
              onChange={setVirtualizedApplicationsRendering}
            />
          </>
        )}
        errorMessage={form.errors.virtualizedApplicationsRendering()?.message}
      />
      <Button alignSelf="flex-start" type="submit" size="small">
        Save
      </Button>
    </form>
  )
}

function* generateApplications(amount: number) {
  let generated = 0
  while (generated < amount) {
    const formData = {
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      skills: faker.lorem.words(),
      details: faker.lorem.paragraph(),
    }
    generated += 1
    yield {
      ...formData,
      letter: templateBasedLetter(formData),
    }
  }
}

function batchGeneration<T>(
  generator: (amount: number) => Generator<T, void, unknown>,
  amount: number,
  perTick: number,
): () => Generator<T[], void, unknown> {
  const generatorInstance = generator(amount)
  return function* () {
    let generated = 0

    while (generated < amount) {
      const batch = []
      for (let i = 0; i < perTick; i++) {
        const res = generatorInstance.next()
        if (res.done) break
        batch.push(res.value)
        generated += 1
      }
      yield batch
    }
  }
}

function PerformanceSpinner() {
  const [time, setTime] = useState(performance.now())

  useEffect(() => {
    const id = setInterval(() => {
      setTime(performance.now())
    }, 1000 / 120)
    return () => clearInterval(id)
  }, [])

  return <div {...stylex.props(styles.performanceSpinner(time / 10))}></div>
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xLarge,
    flexGrow: 1,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.large,
  },
  populateApplicationsSection: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xSmall,
  },
  performanceSpinner: (rotate: number) => ({
    height: "50px",
    width: "50px",
    rotate: `${rotate}deg`,
    backgroundColor: "green",
    transition: "background-color 0.5s ease-out",
  }),
})
