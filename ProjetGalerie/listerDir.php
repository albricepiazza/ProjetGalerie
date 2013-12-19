<?php
	if(isset($chemin))
	{
		$dirname = $chemin;
		$dir = opendir($dirname); 
		$i=0;
		
		while($file = readdir($dir)) {
			$extensionsImg = array('.png', '.gif', '.jpg', '.jpeg');
			$extensionImg = strrchr($file, '.');
			
			if($file != '.' && $file != '..' && !in_array($extensionImg, $extensionsImg))
			{
				$tabCategorie[$i]=$file;
				$i++;
			}
		}
		closedir($dir);
	}
?>