<?php
	if(isset($cheminImg))
	{
		$dirName = $cheminImg;
		$dirI = opendir($dirName); 
		$j=0;
		
		while($fileImg = readdir($dirI)) {
		
			$extensionsImg2 = array('.png', '.gif', '.jpg', '.jpeg');
			$extensionImg2 = strrchr($fileImg, '.');
		
			if($fileImg != '.' && $fileImg != '..' && in_array($extensionImg2, $extensionsImg2))
			{
				$tabImage[$j]=$fileImg;
				$j++;
			}
		}
		closedir($dirI);
	}
?>