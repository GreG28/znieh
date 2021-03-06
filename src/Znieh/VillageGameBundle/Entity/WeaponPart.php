<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;


/**
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class WeaponPart extends GameObject
{

    /**
     * @ORM\ManyToOne(targetEntity="WeaponPartType", cascade={"persist"})
     */
    private $type;

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\Type $type
     * @return WeaponPart
     */
    public function setType(\Znieh\VillageGameBundle\Entity\WeaponPartType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\Type
     */
    public function getType()
    {
        return $this->type;
    }
}
