<script lang="ts">
  import { getData, getSingleData, setData, setSingleData } from "./data.remote";

  let data = $derived(await getData())
  let singleData = $derived(await getSingleData())
</script>

<h1>Data</h1>
{#each data as item, i (i)}
  <p>{item.myValue ?? 'undefined'}</p>
{/each}

<h1>Data (single)</h1>
<p>{singleData ?? 'undefined'}</p>

<h1>Forms</h1>
<p>Open the console to see duplicate "submitting" messages.</p>
<p>After submitting a few times, await_waterfall warnings starts showing up.</p>
<p>Sometimes, the data above stops updating. To reproduce, have the dev server running and update this file. The first submit works as expected but any submit after the first does not update the data shown.</p>
{#each data as item (item.id)}
  <form {...setData.for(item.id).enhance(async ({submit}) => {
    console.log('submitting')
    await submit().updates(getData())
  })}>
    <input name={setData.field('index')} type="hidden" value={item.id}>
    <input name={setData.field('value')} type="text" value={item.myValue}>
    <button type="submit">Submit</button>
  </form>
{/each}

<h1>Form (single)</h1>
<p>This seems to work fine even when editing with the dev server running</p>
<form {...setSingleData.enhance(async ({submit}) => {
  console.log('submitting single')
  await submit().updates(getSingleData())
})}>
  <input name={setData.field('value')} type="text" value={singleData}>
  <button type="submit">Submit</button>
</form>
