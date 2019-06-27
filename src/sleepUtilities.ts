export function sleep(msgInterval : number)
{
  return new Promise(function(resolve){setTimeout(resolve, msgInterval)});
}
