type Props = {
  value: number
}

export default function Cell(props: Props) {
  return (
    <>
      <div class="cell">{props.value}</div>
    </>
  )
}
