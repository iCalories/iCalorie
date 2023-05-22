import { TextInput, Label, Select, Button } from "flowbite-react";
import { PersonalHealthRecord } from "./PersonalHealthRecord";

type PHRFormProps = {
  onSubmit: (values: PersonalHealthRecord) => void;
};

export function PHRForm({onSubmit}: PHRFormProps) {
  return (
    <form onSubmit={e => {
      e.preventDefault()
      const data = new FormData(e.target as HTMLFormElement)
      const values: Record<string, unknown> = {}
      data.forEach((value, key) => {
        values[key] = Number(value)
      })
      values.activeFactor = 1.2
      onSubmit(values as unknown as PersonalHealthRecord)
    }}>
      <div className="mb-6">
        <Label htmlFor="gender" value="Gender" />
        <Select name="gender" id="gender">
          <option value={1}>MAN</option>
          <option value={2}>WOMAN</option>
        </Select>
      </div>
      <div className="mb-6">
        <Label value="Weight" htmlFor="weight"></Label>
        <TextInput
          type="number"
          id="weight"
          name="weight"
          placeholder="please enter your weight"
          required
        />
      </div>
      <div className="mb-6">
        <Label value="Height" htmlFor="height"></Label>
        <TextInput
          type="number"
          id="height"
          name="height"
          placeholder="please enter your height"
          required
        />
      </div>
      <div className="mb-6">
        <Label value="Age" htmlFor="age"></Label>
        <TextInput
          type="number"
          id="age"
          name="age"
          placeholder="please enter your age"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
