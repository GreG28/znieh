<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * WeaponPartType
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class WeaponPartType
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
    * @ORM\ManyToMany(targetEntity="WeaponType", inversedBy="parts")
    */
    private $types;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return WeaponPartType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->types = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Add types
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponType $types
     *
     * @return WeaponPartType
     */
    public function addType(\Znieh\VillageGameBundle\Entity\WeaponType $type)
    {
        $this->types[] = $type;

        return $this;
    }

    /**
     * Remove types
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponType $types
     */
    public function removeType(\Znieh\VillageGameBundle\Entity\WeaponType $type)
    {
        $this->types->removeElement($type);
    }

    /**
     * Get types
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTypes()
    {
        return $this->types;
    }
}
