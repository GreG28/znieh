<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * WeaponPart
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\VillageGameBundle\Entity\WeaponPartRepository")
 */
class WeaponPart
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
}
